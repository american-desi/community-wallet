import { useState } from 'react'
import { Wallet, Send, Users, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

interface Transaction {
  id: string
  type: 'send' | 'receive'
  amount: number
  from: string
  to: string
  timestamp: Date
  description: string
}

interface CommunityMember {
  id: string
  name: string
  avatar: string
  balance: number
}

export default function App() {
  const [walletBalance] = useState(1250.50)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'receive',
      amount: 100,
      from: 'Alice Johnson',
      to: 'You',
      timestamp: new Date(Date.now() - 86400000),
      description: 'Rent contribution',
    },
    {
      id: '2',
      type: 'send',
      amount: 50,
      from: 'You',
      to: 'Bob Smith',
      timestamp: new Date(Date.now() - 172800000),
      description: 'Dinner split',
    },
    {
      id: '3',
      type: 'receive',
      amount: 200,
      from: 'Community Treasury',
      to: 'You',
      timestamp: new Date(Date.now() - 259200000),
      description: 'Monthly dividend',
    },
  ])
  const [members] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'AJ',
      balance: 2100.00,
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'BS',
      balance: 1850.75,
    },
    {
      id: '3',
      name: 'Carol Martinez',
      avatar: 'CM',
      balance: 3200.25,
    },
    {
      id: '4',
      name: 'David Lee',
      avatar: 'DL',
      balance: 1550.00,
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Wallet className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Community Wallet</h1>
          </div>
          <p className="text-gray-600 mt-2">Shared financial infrastructure for communities</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
              <p className="text-indigo-200 mb-2">Wallet Balance</p>
              <h2 className="text-5xl font-bold mb-4">${walletBalance.toFixed(2)}</h2>
              <div className="flex gap-4">
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition flex items-center gap-2">
                  <Send size={18} />
                  Send
                </button>
                <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition flex items-center gap-2">
                  <ArrowDownLeft size={18} />
                  Request
                </button>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${tx.type === 'receive' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {tx.type === 'receive' ? (
                          <ArrowDownLeft className="text-green-600" size={20} />
                        ) : (
                          <ArrowUpRight className="text-red-600" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{tx.description}</p>
                        <p className="text-sm text-gray-600">
                          {tx.type === 'receive' ? 'From' : 'To'} {tx.type === 'receive' ? tx.from : tx.to}
                        </p>
                        <p className="text-xs text-gray-500">{tx.timestamp.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${tx.type === 'receive' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'receive' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Community Members */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Users size={24} className="text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">Community Members</h3>
            </div>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600">${member.balance.toFixed(2)}</p>
                    </div>
                  </div>
                  <button className="w-full bg-indigo-100 text-indigo-600 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-200 transition">
                    Send
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
