import { useState } from 'react'
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, Users } from 'lucide-react'

interface Tx { id: string; type: 'send'|'receive'; amount: number; description: string; from: string; to: string }
interface Member { id: string; name: string; avatar: string; balance: number }

export default function App() {
  const [balance] = useState(1250.50)
  const [txs] = useState<Tx[]>([
    {id:'1',type:'receive',amount:100,from:'Alice Johnson',to:'You',description:'Rent contribution'},
    {id:'2',type:'send',amount:50,from:'You',to:'Bob Smith',description:'Dinner split'},
    {id:'3',type:'receive',amount:200,from:'Community Treasury',to:'You',description:'Monthly dividend'},
  ])
  const [members] = useState<Member[]>([
    {id:'1',name:'Alice Johnson',avatar:'AJ',balance:2100},
    {id:'2',name:'Bob Smith',avatar:'BS',balance:1850.75},
    {id:'3',name:'Carol Martinez',avatar:'CM',balance:3200.25},
  ])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm"><div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3"><Wallet className="text-indigo-600" size={32}/><h1 className="text-3xl font-bold">Community Wallet</h1></div>
        <p className="text-gray-600 mt-2">Shared financial infrastructure for communities</p>
      </div></header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <p className="text-indigo-200 mb-2">Wallet Balance</p>
          <h2 className="text-5xl font-bold mb-4">${balance.toFixed(2)}</h2>
          <div className="flex gap-4">
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><Send size={18}/>Send</button>
            <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><ArrowDownLeft size={18}/>Request</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold mb-6">Recent Transactions</h3>
            {txs.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                <div className="flex items-center gap-4">
                  {tx.type==='receive'?<ArrowDownLeft className="text-green-600"/>:<ArrowUpRight className="text-red-600"/>}
                  <div><p className="font-semibold">{tx.description}</p><p className="text-sm text-gray-600">{tx.type==='receive'?tx.from:tx.to}</p></div>
                </div>
                <div className={tx.type==='receive'?'text-green-600 font-bold':'text-red-600 font-bold'}>{tx.type==='receive'?'+':'-'}${tx.amount}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6"><Users className="text-indigo-600"/><h3 className="text-xl font-bold">Members</h3></div>
            {members.map(m => (
              <div key={m.id} className="p-4 border rounded-lg mb-3">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">{m.avatar}</div><div><p className="font-semibold text-sm">{m.name}</p><p className="text-xs text-gray-600">${m.balance.toFixed(2)}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
