import ChatInterface from '@/components/ChatInterface';
import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06090e] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] text-white font-sans selection:bg-emerald-500/30">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06090e]/80 via-[#06090e]/95 to-[#06090e] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <header className="mb-14 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-sm font-semibold border border-emerald-800/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Active
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-sm">
            The Chama <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Dispute Arbitrator
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
            An unbiased, AI-powered digital auditor. Instantly analyze standard Group bylaws and audit M-Pesa records to resolve conflicts efficiently.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Chat Area */}
          <div className="lg:col-span-8">
            <ChatInterface />
          </div>

          {/* Sidebar / Tools */}
          <div className="lg:col-span-4 space-y-8">
            <FileUpload />

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full border-l border-b border-emerald-500/20"></div>
              <h3 className="text-lg font-bold text-white mb-4">Pipeline Status</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center border border-blue-800">
                      🐘
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Database</p>
                      <p className="text-xs text-gray-500">Live Ledger</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-900/20 px-2 py-1 rounded">Online</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-900/30 flex items-center justify-center border border-purple-800">
                      📄
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Knowledge Base</p>
                      <p className="text-xs text-gray-500">Document Store</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-900/20 px-2 py-1 rounded">Active</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-900/30 flex items-center justify-center border border-orange-800">
                      ⚡
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">AI Intelligence</p>
                      <p className="text-xs text-gray-500">Arbitration Engine</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-900/20 px-2 py-1 rounded">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
