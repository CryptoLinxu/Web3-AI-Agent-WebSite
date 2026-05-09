import { Header } from "@/components/landing/header"
import { Resume } from "@/components/landing/resume"
import { Footer } from "@/components/landing/footer"

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <Resume />
      </div>
      <Footer />
    </main>
  )
}
