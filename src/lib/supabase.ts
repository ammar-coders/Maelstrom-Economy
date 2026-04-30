import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ogtcmpitvwmptbknulhk.supabase.co";
const supabaseKey = "sb_publishable_Low_W7JhoU4lgJTJf-kGig_WqmKWLRP";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function get({table}: { table: string }) {
  return await supabase.from(table).select("*");
}

export async function register(params: {
  mc_name: string;
  real_name: string;
  password: string;
}) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("mc_name", params.mc_name)
    .eq("real_name", params.real_name)
    .eq("password", params.password)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}