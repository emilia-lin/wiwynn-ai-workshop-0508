export interface Employee {
  id: string
  name: string
  department: string
  role: string
  email: string
}

export const employees: Employee[] = [
  { id: '1', name: 'Alice Chen', department: '業務部', role: '業務專員', email: 'alice@company.com' },
  { id: '2', name: 'Bob Wang', department: '技術部', role: '工程師', email: 'bob@company.com' },
  { id: '3', name: 'Carol Lin', department: '人資部', role: 'HR Manager', email: 'carol@company.com' },
  { id: '4', name: 'David Lee', department: '業務部', role: '業務主管', email: 'david@company.com' },
  { id: '5', name: 'Eve Zhang', department: '財務部', role: '財務分析師', email: 'eve@company.com' },
  { id: '6', name: 'Frank Liu', department: '技術部', role: '資深工程師', email: 'frank@company.com' },
  { id: '7', name: 'Grace Wu', department: '行銷部', role: '行銷專員', email: 'grace@company.com' },
  { id: '8', name: 'Henry Huang', department: '維運部', role: '維運工程師', email: 'henry@company.com' },
]
