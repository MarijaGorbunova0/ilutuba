// Vahetuvate piltidega galerii: automaatne vahetus + nooled + punktid
(function () {
  const galerii = document.querySelector('.galerii');
  if (!galerii) return;

  const slaidid = Array.from(galerii.querySelectorAll('.slaid'));
  const punktideKoht = galerii.querySelector('.punktid');
  let praegune = 0;
  let taimer;

  // Punktid (üks iga pildi kohta)
  const punktid = slaidid.map((_, i) => {
    const nupp = document.createElement('button');
    nupp.type = 'button';
    nupp.setAttribute('aria-label', 'Pilt ' + (i + 1));
    nupp.addEventListener('click', () => { nayta(i); kaivita(); });
    punktideKoht.appendChild(nupp);
    return nupp;
  });

  function nayta(i) {
    praegune = (i + slaidid.length) % slaidid.length;
    slaidid.forEach((s, k) => s.classList.toggle('aktiivne', k === praegune));
    punktid.forEach((p, k) => p.classList.toggle('aktiivne', k === praegune));
  }

  function kaivita() {            // (taas)käivita automaatne vahetus iga 4 sekundi järel
    clearInterval(taimer);
    taimer = setInterval(() => nayta(praegune + 1), 4000);
  }

  galerii.querySelector('.eelmine').addEventListener('click', () => { nayta(praegune - 1); kaivita(); });
  galerii.querySelector('.jargmine').addEventListener('click', () => { nayta(praegune + 1); kaivita(); });

  nayta(0);
  kaivita();
})();
