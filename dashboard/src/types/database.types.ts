export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      gesundheitschecks: {
        Row: {
          datum: string
          deleted_at: string | null
          ergebnis: string
          hund_id: string
          id: string
          kategorie: string
          notiz: string | null
          tierarzt: string | null
        }
        Insert: {
          datum: string
          deleted_at?: string | null
          ergebnis: string
          hund_id: string
          id?: string
          kategorie: string
          notiz?: string | null
          tierarzt?: string | null
        }
        Update: {
          datum?: string
          deleted_at?: string | null
          ergebnis?: string
          hund_id?: string
          id?: string
          kategorie?: string
          notiz?: string | null
          tierarzt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gesundheitschecks_hund_id_fkey"
            columns: ["hund_id"]
            isOneToOne: false
            referencedRelation: "hunde"
            referencedColumns: ["id"]
          },
        ]
      }
      hunde: {
        Row: {
          created_at: string
          deleted_at: string | null
          foto_url: string | null
          geburtsdatum: string
          geschlecht: string
          id: string
          mutter_extern_name: string | null
          mutter_extern_zwinger: string | null
          mutter_id: string | null
          name: string
          vater_extern_name: string | null
          vater_extern_zwinger: string | null
          vater_id: string | null
          veroeffentlicht: boolean
          video_url: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          foto_url?: string | null
          geburtsdatum: string
          geschlecht: string
          id?: string
          mutter_extern_name?: string | null
          mutter_extern_zwinger?: string | null
          mutter_id?: string | null
          name: string
          vater_extern_name?: string | null
          vater_extern_zwinger?: string | null
          vater_id?: string | null
          veroeffentlicht?: boolean
          video_url?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          foto_url?: string | null
          geburtsdatum?: string
          geschlecht?: string
          id?: string
          mutter_extern_name?: string | null
          mutter_extern_zwinger?: string | null
          mutter_id?: string | null
          name?: string
          vater_extern_name?: string | null
          vater_extern_zwinger?: string | null
          vater_id?: string | null
          veroeffentlicht?: boolean
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hunde_mutter_id_fkey"
            columns: ["mutter_id"]
            isOneToOne: false
            referencedRelation: "hunde"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hunde_vater_id_fkey"
            columns: ["vater_id"]
            isOneToOne: false
            referencedRelation: "hunde"
            referencedColumns: ["id"]
          },
        ]
      }
      kaeufer: {
        Row: {
          deleted_at: string | null
          email: string | null
          id: string
          name: string
          notiz: string | null
          ort: string | null
          telefon: string | null
        }
        Insert: {
          deleted_at?: string | null
          email?: string | null
          id?: string
          name: string
          notiz?: string | null
          ort?: string | null
          telefon?: string | null
        }
        Update: {
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notiz?: string | null
          ort?: string | null
          telefon?: string | null
        }
        Relationships: []
      }
      pruefungen: {
        Row: {
          art: string
          datum: string
          deleted_at: string | null
          ergebnis: string
          hund_id: string
          id: string
          notiz: string | null
          ort: string | null
        }
        Insert: {
          art: string
          datum: string
          deleted_at?: string | null
          ergebnis: string
          hund_id: string
          id?: string
          notiz?: string | null
          ort?: string | null
        }
        Update: {
          art?: string
          datum?: string
          deleted_at?: string | null
          ergebnis?: string
          hund_id?: string
          id?: string
          notiz?: string | null
          ort?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pruefungen_hund_id_fkey"
            columns: ["hund_id"]
            isOneToOne: false
            referencedRelation: "hunde"
            referencedColumns: ["id"]
          },
        ]
      }
      verkaeufe: {
        Row: {
          datum: string
          deleted_at: string | null
          id: string
          kaeufer_id: string
          notiz: string | null
          preis: number | null
          welpe_label: string
          wurf_id: string
        }
        Insert: {
          datum: string
          deleted_at?: string | null
          id?: string
          kaeufer_id: string
          notiz?: string | null
          preis?: number | null
          welpe_label: string
          wurf_id: string
        }
        Update: {
          datum?: string
          deleted_at?: string | null
          id?: string
          kaeufer_id?: string
          notiz?: string | null
          preis?: number | null
          welpe_label?: string
          wurf_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verkaeufe_kaeufer_id_fkey"
            columns: ["kaeufer_id"]
            isOneToOne: false
            referencedRelation: "kaeufer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verkaeufe_wurf_id_fkey"
            columns: ["wurf_id"]
            isOneToOne: false
            referencedRelation: "wuerfe"
            referencedColumns: ["id"]
          },
        ]
      }
      wuerfe: {
        Row: {
          anzahl_huendinnen: number
          anzahl_ruden: number
          datum: string
          deleted_at: string | null
          id: string
          mutter_id: string
          notiz: string | null
          vater_extern_name: string | null
          vater_extern_zwinger: string | null
          vater_id: string | null
        }
        Insert: {
          anzahl_huendinnen?: number
          anzahl_ruden?: number
          datum: string
          deleted_at?: string | null
          id?: string
          mutter_id: string
          notiz?: string | null
          vater_extern_name?: string | null
          vater_extern_zwinger?: string | null
          vater_id?: string | null
        }
        Update: {
          anzahl_huendinnen?: number
          anzahl_ruden?: number
          datum?: string
          deleted_at?: string | null
          id?: string
          mutter_id?: string
          notiz?: string | null
          vater_extern_name?: string | null
          vater_extern_zwinger?: string | null
          vater_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wuerfe_mutter_id_fkey"
            columns: ["mutter_id"]
            isOneToOne: false
            referencedRelation: "hunde"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wuerfe_vater_id_fkey"
            columns: ["vater_id"]
            isOneToOne: false
            referencedRelation: "hunde"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  T extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]),
> = (DefaultSchema["Tables"] & DefaultSchema["Views"])[T] extends { Row: infer R } ? R : never

export type TablesInsert<
  T extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][T] extends { Insert: infer I } ? I : never

export type TablesUpdate<
  T extends keyof DefaultSchema["Tables"],
> = DefaultSchema["Tables"][T] extends { Update: infer U } ? U : never
