"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Address = {
  id: number
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
  is_default: boolean
}

export default function AddressForm({
  user,
  onSaved,
  onNextStep,
}: {
  user: any
  onSaved: (address: Address) => void
  onNextStep: (address: Address) => void
}) {
  const [form, setForm] = useState({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: true })
      if (!error && data) setAddresses(data as Address[])
      if (data && data.length) {
        setSelectedId(data[0].id)
        onSaved(data[0])
      }
    }
    fetchAddresses()
  }, [user.id, onSaved])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from("addresses")
      .insert([{ user_id: user.id, ...form, is_default: true }])
      .select()
      .single()

    if (error) {
      alert("Error saving address: " + error.message)
    } else {
      setAddresses((prev) => [...prev, data])
      setSelectedId(data.id)
      onSaved(data)
      setShowForm(false)
      setForm({
        full_name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: "",
      })
    }

    console.log("Saved new address:", data)
    setLoading(false)
  }

  const handleSelect = (id: number) => {
    const addr = addresses.find((a) => a.id === id)
    if (addr) {
      console.log("Selected address:", addr)
      setSelectedId(id)
      onSaved(addr)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      {/* Existing Addresses */}
      {addresses.length > 0 && !showForm && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Select Delivery Address</h2>
          <div className="space-y-2">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                  selectedId === addr.id ? "bg-muted" : "border-gray-300"
                }`}
              >
                <div>
                  <p className="font-semibold">{addr.full_name}</p>
                  <p className="text-sm">{addr.address_line1} {addr.address_line2}</p>
                  <p className="text-sm">{addr.city}, {addr.state}, {addr.postal_code}, {addr.country}</p>
                  <p className="text-sm">Phone: {addr.phone}</p>
                </div>
                <input
                  type="radio"
                  name="selected_address"
                  checked={selectedId === addr.id}
                  onChange={() => handleSelect(addr.id)}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={() => setShowForm(true)}>Add New Address</Button>
            <Button
              onClick={() => {
                const selectedAddr = addresses.find(a => a.id === selectedId)
                if (selectedAddr) onNextStep(selectedAddr)
              }}
              disabled={!selectedId}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      )}

      {/* Add New Address */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-black shadow-sm">
          <h2 className="text-xl font-semibold">Add New Address</h2>
          <Input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
          <Input name="address_line1" placeholder="Address Line 1" value={form.address_line1} onChange={handleChange} required />
          <Input name="address_line2" placeholder="Address Line 2" value={form.address_line2} onChange={handleChange} />
          <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          <Input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
          <Input name="postal_code" placeholder="Postal Code" value={form.postal_code} onChange={handleChange} required />
          <Input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
          <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />

          <div className="flex justify-between mt-4">
            <Button type="button" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
