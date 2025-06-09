import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calculator, CreditCard, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SplitMate</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Split Expenses, Not Friendships</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            SplitMate simplifies group expense tracking and debt settlement. Create groups, log expenses, and let us
            handle the math automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Splitting for Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Split Smart</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From group trips to shared apartments, SplitMate handles all your expense splitting needs with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Group Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create groups for trips, roommates, or any shared expenses. Invite members with a simple link.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Smart Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically calculate who owes what with support for unequal splits and custom shares.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CreditCard className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Expense Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Log expenses with photos, categories, and notes. Track everything from groceries to utilities.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Real-time Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All changes sync instantly across devices. Everyone stays updated on group expenses.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Splitting?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust SplitMate for their group expenses.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Create Your First Group
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="h-6 w-6" />
            <span className="text-lg font-semibold">SplitMate</span>
          </div>
          <p className="text-gray-400">© 2024 SplitMate. Making expense splitting simple and fair.</p>
        </div>
      </footer>
    </div>
  )
}
