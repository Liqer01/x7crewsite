// aktiflik.js dosyasının içi SADECE böyle olmalı:

async function tabloyuDoldur() {
    const tabloGövdesi = document.getElementById('aktiflik-tablosu');
    tabloGövdesi.innerHTML = '<tr class="text-center"><td colspan="4" class="p-4 text-gray-500">Veriler Discord\'dan çekiliyor...</td></tr>';

    try {
        const response = await fetch('https://api.closydev.site/api/aktiflik-siralamasi'); // Bot bağlandığında burası değişecek
        const kullanicilar = await response.json();
        
        tabloGövdesi.innerHTML = ''; 

        kullanicilar.forEach((kullanici, index) => {
            const siraNo = index + 1;
            let siraRengi = "text-gray-400";
            if(siraNo === 1) siraRengi = "text-emerald-500";
            if(siraNo === 2) siraRengi = "text-amber-500";
            if(siraNo === 3) siraRengi = "text-blue-500";

            const satirHTML = `
                <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td class="p-4 font-bold ${siraRengi}">#${siraNo}</td>
                    <td class="p-4 flex items-center gap-3">
                        <img src="${kullanici.avatarUrl}" class="w-8 h-8 rounded-full bg-gray-800" alt="Avatar">
                        <span>${kullanici.discordIsmi}</span>
                    </td>
                    <td class="p-4 text-center">
                        <span class="px-2 py-1 bg-white/10 text-gray-300 rounded text-[10px]">${kullanici.durum}</span>
                    </td>
                    <td class="p-4 text-right font-mono">${kullanici.toplamSaat} Saat</td>
                </tr>
            `;
            tabloGövdesi.innerHTML += satirHTML;
        });

    } catch (error) {
        tabloGövdesi.innerHTML = '<tr class="text-center"><td colspan="4" class="p-4 text-red-500">Veriler çekilirken bir hata oluştu!</td></tr>';
        console.error(error);
    }
}

window.onload = tabloyuDoldur;