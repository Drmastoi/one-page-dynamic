export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      questionnaire_submissions: {
        Row: {
          accident_date: string
          accident_description: string
          accident_location: string
          address: string
          city: string
          claim_filed: string
          created_at: string
          current_pain: string
          date_of_birth: string
          doctor_name: string | null
          email: string
          fault_party: string
          full_name: string
          hospital_name: string | null
          id: string
          immediate_pain: string
          impact_location: string
          injury_description: string
          insurance_company: string
          medical_treatment: string
          ongoing_treatment: string
          other_vehicle_type: string
          phone: string
          photo_urls: string[] | null
          police_report_filed: string
          police_report_number: string | null
          policy_number: string | null
          road_conditions: string | null
          state: string
          traffic_conditions: string | null
          updated_at: string
          vehicle_damage: string
          vehicle_location: string
          vehicle_type: string
          weather_conditions: string | null
          who_lives_with_you: string
          witness_details: string | null
          witnesses: string
          zip_code: string
        }
        Insert: {
          accident_date: string
          accident_description: string
          accident_location: string
          address: string
          city: string
          claim_filed: string
          created_at?: string
          current_pain: string
          date_of_birth: string
          doctor_name?: string | null
          email: string
          fault_party: string
          full_name: string
          hospital_name?: string | null
          id?: string
          immediate_pain: string
          impact_location: string
          injury_description: string
          insurance_company: string
          medical_treatment: string
          ongoing_treatment: string
          other_vehicle_type: string
          phone: string
          photo_urls?: string[] | null
          police_report_filed: string
          police_report_number?: string | null
          policy_number?: string | null
          road_conditions?: string | null
          state: string
          traffic_conditions?: string | null
          updated_at?: string
          vehicle_damage: string
          vehicle_location: string
          vehicle_type: string
          weather_conditions?: string | null
          who_lives_with_you: string
          witness_details?: string | null
          witnesses: string
          zip_code: string
        }
        Update: {
          accident_date?: string
          accident_description?: string
          accident_location?: string
          address?: string
          city?: string
          claim_filed?: string
          created_at?: string
          current_pain?: string
          date_of_birth?: string
          doctor_name?: string | null
          email?: string
          fault_party?: string
          full_name?: string
          hospital_name?: string | null
          id?: string
          immediate_pain?: string
          impact_location?: string
          injury_description?: string
          insurance_company?: string
          medical_treatment?: string
          ongoing_treatment?: string
          other_vehicle_type?: string
          phone?: string
          photo_urls?: string[] | null
          police_report_filed?: string
          police_report_number?: string | null
          policy_number?: string | null
          road_conditions?: string | null
          state?: string
          traffic_conditions?: string | null
          updated_at?: string
          vehicle_damage?: string
          vehicle_location?: string
          vehicle_type?: string
          weather_conditions?: string | null
          who_lives_with_you?: string
          witness_details?: string | null
          witnesses?: string
          zip_code?: string
        }
        Relationships: []
      }
      submission_rate_limits: {
        Row: {
          created_at: string
          id: string
          ip_address: string
          submission_count: number
          window_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address: string
          submission_count?: number
          window_start?: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string
          submission_count?: number
          window_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
