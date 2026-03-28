const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const mobileMenuTag = `<!-- mobileMenuScript injected -->`;
const injectedScript = `<script id="mobile-menu-script">
document.addEventListener('DOMContentLoaded', () => {
    const mobileCss = document.createElement('style');
    mobileCss.innerHTML = \`
        nav .flex.items-center.gap-4 > a,
        nav .flex.items-center.gap-6 > a,
        nav .flex.justify-between > div:last-child > a {
            display: none !important;
        }
        @media (min-width: 768px) {
            nav .flex.items-center.gap-4 > a,
            nav .flex.items-center.gap-6 > a,
            nav .flex.justify-between > div:last-child > a {
                display: inline-flex !important;
            }
        }
        #unifiedMobileMenu {
            position: fixed; top: 5rem; left: 0; width: 100%; height: calc(100vh - 5rem);
            background: rgba(255,255,255,0.98); z-index: 9999; display: flex; flex-direction: column; overflow-y: auto;
            transform: translateY(-120%); opacity: 0; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(20px); padding: 2rem; gap: 1rem;
        }
        html.dark #unifiedMobileMenu { background: rgba(15,23,42,0.98); border-bottom: 1px solid rgba(51,65,85,0.5); }
        #unifiedMobileMenu.open { transform: translateY(0); opacity: 1; }
    \`;
    document.head.appendChild(mobileCss);

    const navRight = document.querySelector('nav .flex.items-center.gap-4') 
                  || document.querySelector('nav .flex.items-center.gap-6')
                  || document.querySelector('nav .flex.justify-between > div:last-child');
                  
    if (!navRight) return;

    // Optional: remove old toggle if present
    const oldToggle = document.getElementById('mobileSidebarToggle');
    if (oldToggle) oldToggle.remove();

    let hamburger = document.getElementById('mobileUnifiedToggle');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.id = 'mobileUnifiedToggle';
        hamburger.className = 'md:hidden text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors flex items-center justify-center';
        hamburger.innerHTML = '<span class="material-symbols-outlined" style="font-size:28px;">menu</span>';
        navRight.appendChild(hamburger);
    }
    
    if (document.getElementById('unifiedMobileMenu')) return;

    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'unifiedMobileMenu';
    
    let menuHTML = '';
    
    const centerLinks = document.querySelector('nav .hidden.md\\\\:flex');
    if (centerLinks) {
        menuHTML += '<div class="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 pb-6 mb-2">';
        const links = centerLinks.querySelectorAll('a');
        links.forEach(l => {
            menuHTML += \`<a href="\${l.href}" class="text-xl font-bold text-slate-800 dark:text-slate-200 hover:text-[#47689A] transition-colors">\${l.textContent}</a>\`;
        });
        menuHTML += '</div>';
    }
    
    const sidebar = document.querySelector('aside');
    if (sidebar) {
        const sideLinks = sidebar.querySelectorAll('nav a.side-link, .mt-auto a.side-link');
        if (sideLinks.length > 0) {
            menuHTML += '<div class="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-700 pb-6 mb-2">';
            menuHTML += '<p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">My Account</p>';
            sideLinks.forEach(l => {
                const htmlContent = l.innerHTML;
                menuHTML += \`<a href="\${l.href}" class="text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-3 hover:text-[#47689A] transition-colors">\${htmlContent}</a>\`;
            });
            menuHTML += '</div>';
        }
    }
    
    const rightLinks = navRight.querySelectorAll('a');
    if (rightLinks.length > 0) {
        menuHTML += '<div class="flex flex-col gap-4 pt-2 pb-12">';
        rightLinks.forEach(l => {
            const isButton = l.className.includes('bg-') || l.className.includes('kinetic') || l.className.includes('from-primary');
            if (isButton) {
                menuHTML += \`<a href="\${l.href}" class="mt-4 text-center py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-md hover:scale-[1.02] transition-transform">\${l.textContent}</a>\`;
            } else {
                menuHTML += \`<a href="\${l.href}" class="text-lg font-semibold text-slate-600 dark:text-slate-400 hover:text-[#47689A] transition-colors">\${l.textContent}</a>\`;
            }
        });
        menuHTML += '</div>';
    }
    
    mobileMenu.innerHTML = menuHTML;
    document.body.appendChild(mobileMenu);
    
    let isOpen = false;
    hamburger.addEventListener('click', () => {
        isOpen = !isOpen;
        if(isOpen) {
            mobileMenu.classList.add('open');
            hamburger.innerHTML = '<span class="material-symbols-outlined" style="font-size:28px;">close</span>';
            document.body.style.overflow = 'hidden'; 
        } else {
            mobileMenu.classList.remove('open');
            hamburger.innerHTML = '<span class="material-symbols-outlined" style="font-size:28px;">menu</span>';
            document.body.style.overflow = '';
        }
    });

    mobileMenu.addEventListener('click', (e) => {
        if(e.target.closest('a')) {
            isOpen = false;
            mobileMenu.classList.remove('open');
            hamburger.innerHTML = '<span class="material-symbols-outlined" style="font-size:28px;">menu</span>';
            document.body.style.overflow = '';
        }
    });
});
</script>`;

let count = 0;
for(let f of files){
    let c = fs.readFileSync(f, 'utf8');
    
    // Attempt to remove the old manual mobile toggle script if it's there
    c = c.replace(/<script>\s*\/\/\s*Mobile sidebar toggle[\s\S]*?<\/script>/, '');
    
    if(!c.includes('mobileMenuScript injected')) {
        const i = c.lastIndexOf('</body>');
        if(i !== -1) {
            c = c.substring(0, i) + '\n\n' + mobileMenuTag + '\n' + injectedScript + '\n' + c.substring(i);
            fs.writeFileSync(f, c);
            count++;
        }
    }
}
console.log('Modified', count, 'files successfully.');
