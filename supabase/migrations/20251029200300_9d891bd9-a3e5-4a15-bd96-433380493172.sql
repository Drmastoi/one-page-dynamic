-- Create table for rate limiting
CREATE TABLE IF NOT EXISTS public.submission_rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text NOT NULL,
  submission_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(ip_address, window_start)
);

-- Enable RLS
ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow the service role to manage rate limits (edge functions use service role)
CREATE POLICY "Service role can manage rate limits"
ON public.submission_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_rate_limits_ip_window ON public.submission_rate_limits(ip_address, window_start DESC);

-- Create function to clean up old rate limit records (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.submission_rate_limits
  WHERE window_start < now() - interval '24 hours';
END;
$$;