import Sidebar from "../../components/Sidebar";

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen pt-20">
      {/* Reusable Global Sidebar for Learner Pages */}
      <Sidebar />
      
      {/* The main page content injected below */}
      <main className="flex-1 md:ml-72 p-6 md:p-10 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
