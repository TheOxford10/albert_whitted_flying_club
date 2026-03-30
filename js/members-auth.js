(function () {
  var cfg = window.AWFC_FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey || cfg.apiKey.indexOf('YOUR') === 0) {
    console.warn('AWFC: Set js/firebase-config.js with your Firebase web app config.');
    window.awfcSignInGoogle = function () {
      alert('Configure js/firebase-config.js with your Firebase web app values first.');
    };
    window.awfcSignOut = function () {};
    return;
  }

  firebase.initializeApp(cfg);
  var auth = firebase.auth();
  var db = firebase.firestore();

  function isMembersPortalPage() {
    return /members\.html$/.test(window.location.pathname);
  }

  function portalEl(id) {
    return document.getElementById(id);
  }

  function updatePortalUI(user, isMember) {
    if (!isMembersPortalPage()) return;
    var loginBlock = portalEl('portal-login');
    var deniedBlock = portalEl('portal-denied');
    var contentBlock = portalEl('portal-content');
    if (!loginBlock) return;

    loginBlock.hidden = true;
    if (deniedBlock) deniedBlock.hidden = true;
    if (contentBlock) contentBlock.hidden = true;

    if (!user) {
      loginBlock.hidden = false;
      return;
    }
    if (!isMember) {
      if (deniedBlock) deniedBlock.hidden = false;
      return;
    }
    if (contentBlock) contentBlock.hidden = false;
  }

  function fillPortalLinks() {
    var links = window.AWFC_PORTAL_LINKS || {};
    var mn = portalEl('portal-link-meeting-notes');
    if (mn && links.meetingNotes && links.meetingNotes.indexOf('REPLACE') === -1) {
      mn.href = links.meetingNotes;
    }
  }

  auth.onAuthStateChanged(function (user) {
    fillPortalLinks();

    if (!user) {
      updatePortalUI(null, false);
      return;
    }

    var email = user.email;
    if (!email) {
      updatePortalUI(user, false);
      return;
    }

    db.collection('member_allowlist')
      .doc(email)
      .get()
      .then(function (snap) {
        var isMember = snap.exists;
        updatePortalUI(user, isMember);
      })
      .catch(function (err) {
        console.error('AWFC member check failed', err);
        updatePortalUI(user, false);
      });
  });

  window.awfcSignInGoogle = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider).catch(function (e) {
      console.error(e);
      alert('Sign-in failed: ' + (e.message || String(e)));
    });
  };

  window.awfcSignOut = function () {
    return auth.signOut();
  };

  document.addEventListener('DOMContentLoaded', function () {
    var btnIn = document.getElementById('portal-btn-sign-in');
    var btnOut = document.getElementById('portal-btn-sign-out');
    var btnOutDenied = document.getElementById('portal-btn-sign-out-denied');
    if (btnIn) btnIn.addEventListener('click', function () { window.awfcSignInGoogle(); });
    if (btnOut) btnOut.addEventListener('click', function () { window.awfcSignOut(); });
    if (btnOutDenied) btnOutDenied.addEventListener('click', function () { window.awfcSignOut(); });
    fillPortalLinks();
  });
})();
