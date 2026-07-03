// auth.js - Tüm sayfalarda çalışacak ortak script
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('x7_username');
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const profileName = document.getElementById('profile-name');

    if (username) {
        // Kullanıcı giriş yapmışsa
        if (loginBtn) loginBtn.style.display = 'none'; // Kayıt ol butonunu gizle
        if (userProfile) userProfile.style.display = 'flex'; // Profil alanını göster
        if (profileName) profileName.innerText = username; // Navbar'a ismi yaz
    }
});