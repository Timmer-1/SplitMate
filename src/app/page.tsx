'use client'

import { Button } from "@/components/ui/button"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { Users, Calculator, CreditCard, Smartphone, Sparkles, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })


  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl animate-bounce [animation-duration:3s]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Calculator className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
              <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
              SplitMate
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className='max-w-5xl mx-auto transition-all duration-1000'>
          <AnimatedShinyText className="shimmerWidth=100 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-700 text-sm font-medium mb-8 backdrop-blur-sm shadow-sm">
            <Zap className="h-4 w-4 mr-2 text-amber-500" />
            Now with AI-powered expense categorization
          </AnimatedShinyText>

          <h2 className="text-7xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
              Split Expenses,
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
              Not Friendships
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most intuitive way to track group expenses. Create groups, split bills instantly,
            and watch the magic happen with our smart settlement algorithm.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-12 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 group relative overflow-hidden text-white">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  Get Started for Free
                  <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-12 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 backdrop-blur-sm transition-all duration-300 shadow-sm">
                View Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Old Way vs New Way Section */}
      <section id="old-vs-new" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-6">
              Why settle for
              <span className="text-gray-400"> the stone age</span>
              <br />
              when you can live in
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"> the future?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Old Way */}
            <div className="space-y-8 opacity-60 grayscale">
              <h3 className="text-3xl font-bold text-gray-500 mb-8 text-center">The Stone Age</h3>
              {[
                { icon: Calculator, title: "Manual Calculations", desc: "Pen, paper, and prayer" },
                { icon: Users, title: "Awkward Reminders", desc: "\"Hey, you still owe me...\"" },
                { icon: CreditCard, title: "Receipt Chaos", desc: "Lost in pockets and purses" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                  <item.icon className="h-8 w-8 text-gray-400" />
                  <div>
                    <h4 className="font-semibold text-gray-600">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* New Way */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-8 text-center">The SplitMate Way</h3>
              {[
                { icon: Zap, title: "Quantum Math", desc: "AI-powered instant calculations", color: "from-emerald-500 to-teal-500" },
                { icon: Sparkles, title: "Smart Reminders", desc: "Gentle nudges, zero awkwardness", color: "from-blue-500 to-cyan-500" },
                { icon: Smartphone, title: "Receipt Vision", desc: "Snap once, magic happens", color: "from-purple-500 to-violet-500" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-emerald-50 rounded-lg border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      < section id="cta" className="relative z-10 py-20" >
        <div className="container mx-auto px-4 text-center">
          <div className='bg-gradient-to-r from-gray-50 to-white backdrop-blur-xl border border-gray-200 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl transition-all duration-1000 delay-500'>
            <div className="flex justify-center mb-8">
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-800 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-4xl font-black text-gray-800 mb-6">
              Join the Revolution
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Over 50,000 groups worldwide trust SplitMate.
              <span className="text-emerald-600 font-semibold"> Your turn to experience the magic.</span>
            </p>

            <Link href="/signup">
              <Button size="lg" className="text-xl px-16 py-6 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 border-0 shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 group relative overflow-hidden rounded-full text-white">
                <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                <span className="relative flex items-center font-bold">
                  Create Your First Group
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </Link>

            <p className="text-sm text-gray-500 mt-6">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section >

      {/* Footer Glow */}
      < div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-30" />
    </div >
  )
}