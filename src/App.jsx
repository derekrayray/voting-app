import { useState } from 'react'
import { supabase } from './supabaseClient'
import { Award, CheckCircle, ChevronRight, User } from 'lucide-react'
import './index.css'

// Mock list of employees
const EMPLOYEES = [
  { id: 1, name: '侯亚楠' },
  { id: 2, name: '闻丽' },
  { id: 3, name: '熊吟秋' },
  { id: 4, name: 'Pico' },
  { id: 5, name: 'Joan' },
  { id: 6, name: '吉培培' },
  { id: 7, name: 'Cindy' },
  { id: 8, name: '宋会群' },
  { id: 9, name: '费佳雪' },
  { id: 10, name: '俞呈橙' },
  { id: 11, name: '马丽' },
  { id: 12, name: '刘金铃' },
  { id: 13, name: '陈洁璐' },
  { id: 14, name: 'Jerry' },
  { id: 15, name: 'Trevor' },
]

function App() {
  const [selectedNominee, setSelectedNominee] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [error, setError] = useState(null)



  const handleVote = async () => {
    if (!selectedNominee) return
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: supaError } = await supabase
        .from('votes')
        .insert([{ nominee_name: selectedNominee }])

      if (supaError) throw supaError

      setHasVoted(true)
    } catch (err) {
      console.error('Error submitting vote:', err)
      setError('Failed to submit your vote. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (hasVoted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in relative z-10 w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
        <div className="glass-panel text-center p-12 max-w-md w-full" style={{ padding: '3rem', margin: 'auto' }}>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#FFE600]/30 text-black mb-8 mx-auto" style={{ margin: '0 auto 2rem auto', display: 'flex', width: '6rem', height: '6rem', borderRadius: '9999px', background: 'rgba(255, 230, 0, 0.3)', color: '#000', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gradient" style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>Vote Recorded!</h2>
          <p className="text-lg text-secondary mb-8" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Thank you for participating! The results will be announced at the end of the month.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-24 relative z-10" style={{ maxWidth: '56rem', margin: '0 auto', padding: '1.5rem', paddingBottom: '6rem' }}>
      
      {/* Header */}
      <header className="text-center mb-12 animate-fade-in stagger-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#FFE600]/30 text-black mb-6" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '9999px', background: 'rgba(255, 230, 0, 0.3)', color: '#000', marginBottom: '1.5rem' }}>
            <Award size={40} />
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tight" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.025em' }}>
          <span className="text-gradient">AI优秀奖</span>
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '42rem', margin: '0 auto' }}>
          表彰杰出贡献。请匿名选择一位同事投出您的选票。
        </p>
      </header>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-600 p-4 rounded-lg mb-8 text-center animate-fade-in" style={{ background: 'rgba(254, 226, 226, 1)', border: '1px solid rgba(254, 202, 202, 1)', color: '#dc2626', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {EMPLOYEES.map((emp) => (
          <div 
            key={emp.id}
            onClick={() => setSelectedNominee(emp.name)}
            className={`glass-card p-6 flex flex-col items-center text-center ${selectedNominee === emp.name ? 'selected' : ''}`}
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4" style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
               <User size={28} className="opacity-70 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-1" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{emp.name}</h3>
            
            {/* Selection indicator */}
            <div className={`mt-4 h-6 w-6 rounded-full border-2 border-black/10 flex items-center justify-center transition-colors ${selectedNominee === emp.name ? 'bg-primary border-primary' : ''}`} style={{ marginTop: '1rem', height: '1.5rem', width: '1.5rem', borderRadius: '9999px', border: '2px solid rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: selectedNominee === emp.name ? 'var(--primary)' : 'transparent', borderColor: selectedNominee === emp.name ? 'var(--primary)' : 'rgba(0, 0, 0, 0.1)' }}>
              {selectedNominee === emp.name && <div className="w-2 h-2 bg-black rounded-full" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'black', borderRadius: '9999px' }} />}
            </div>
          </div>
        ))}
      </div>
      
      {/* Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 flex justify-center backdrop-blur-md bg-white/80 border-t border-black/5 transition-transform duration-500 z-50 ${selectedNominee ? 'translate-y-0' : 'translate-y-full'}`} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'center', backdropFilter: 'blur(12px)', backgroundColor: 'transparent', borderTop: '1px solid rgba(0, 0, 0, 0.05)', transform: selectedNominee ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.5s', zIndex: 50 }}>
        <button 
          onClick={handleVote}
          disabled={!selectedNominee || isSubmitting}
          className="btn-primary w-full max-w-sm flex items-center justify-center shadow-2xl"
          style={{ width: '100%', maxWidth: '24rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isSubmitting ? 'Submitting...' : `Vote for ${selectedNominee}`}
          {!isSubmitting && <ChevronRight size={20} />}
        </button>
      </div>

    </div>
  )
}

export default App
