import Image from "next/image";

export default function AccountSettings() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Account Settings</h1>
        <p className="text-secondary text-lg">Manage your profile, account preferences, and security.</p>
      </header>

      <div className="space-y-12">
        {/* User Profile Section */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#9e4200] mb-8">User Profile</h2>
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Avatar Upload UI */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                <span className="material-symbols-outlined text-4xl text-slate-300">person</span>
                <Image 
                  alt="User Profile Avatar" 
                  className="absolute inset-0 w-full h-full object-cover hidden group-hover:block" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqhiSSg_YxiyYezF-U2NVwc5XJa6OwIYKpINp1BkoUukRZtsWPEYxfr2tQqspWtjnMdpAmN1eXDjE5cHkQEQy4eUu_eylcXqDeNw0-7F475uo3PeABnI10ZllsHdgLveIftUkGHm8Uq4VRoIfOxLr2QkcJYIh8gOxzrEF-Qd16O3oHUe7iIOI9n8MiAsntX0Sdz36W8TsLxcxNyso_9QE5_qKHbT2aMr8Wdcgv23GQKjRcwPqTjK23hf5G9WQnnK97KD0i24Qg3cg"
                  fill
                  unoptimized
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary-container text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
              <div className="mt-4 text-center md:text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avatar Upload</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">JPG, GIF or PNG.<br/>Max size of 2MB.</p>
              </div>
            </div>

            {/* Form Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                <input className="w-full bg-[#f6f3f2] border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff7e31]/20 focus:border-[#ff7e31] outline-none transition-all" type="text" defaultValue="Alexander Sterling"/>
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                <input className="w-full bg-[#f6f3f2] border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff7e31]/20 focus:border-[#ff7e31] outline-none transition-all" type="email" defaultValue="alex.sterling@baynalgroup.com"/>
              </div>
              <div className="col-span-full">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Short Bio</label>
                <textarea className="w-full bg-[#f6f3f2] border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff7e31]/20 focus:border-[#ff7e31] outline-none transition-all resize-none" rows={4} defaultValue="Product Designer and lifelong learner. Passionate about creating elegant digital experiences and mastering the craft of creative education."></textarea>
              </div>
              <div className="col-span-full pt-4">
                <button className="bg-gradient-to-br from-[#9e4200] to-[#ff7e31] text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:translate-y-[-4px] hover:shadow-xl hover:shadow-[#ff7e31]/20 transition-all duration-300">
                    Save Changes
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Password Change Section */}
        <section className="bg-[#f6f3f2] rounded-xl p-8 border border-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#9e4200]">Security</h2>
              <p className="text-xs text-slate-500 mt-1">Update your password to keep your account secure.</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-3xl">lock_open</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Current Password</label>
              <input className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff7e31]/20 focus:border-[#ff7e31] outline-none transition-all" placeholder="••••••••" type="password"/>
            </div>
            <div className="col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">New Password</label>
              <input className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff7e31]/20 focus:border-[#ff7e31] outline-none transition-all" placeholder="••••••••" type="password"/>
            </div>
            <div className="col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Confirm New Password</label>
              <input className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff7e31]/20 focus:border-[#ff7e31] outline-none transition-all" placeholder="••••••••" type="password"/>
            </div>
            <div className="col-span-full pt-4 flex justify-end">
              <button className="bg-[#9e4200] text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-all border border-[#9e4200]/20">
                  Update Password
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="p-8 border-2 border-dashed border-red-500/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-red-600">Danger Zone</h2>
              <p className="text-xs text-slate-500 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <button className="text-red-600 border border-red-500/30 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
