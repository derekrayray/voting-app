import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvzdlgvwucotxntfluis.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2emRsZ3Z3dWNvdHhudGZsdWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDExMDMsImV4cCI6MjA4ODY3NzEwM30.xp6LSv21b3i9h0o_UJFnIVYaq621LpnaBZrQeR2weAc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testVote() {
  console.log("Testing vote insertion...");
  const { data, error } = await supabase
    .from('votes')
    .insert([{ nominee_name: 'Test Nominee' }]);
  
  if (error) {
    console.error("Error inserting vote:", error);
  } else {
    console.log("Vote inserted successfully:", data);
  }
}

testVote();
