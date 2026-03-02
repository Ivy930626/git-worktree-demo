import { useEffect, useState } from 'react';

const CONSENT_KEY = 'salespilot-cookie-consent';
const LATER_KEY = 'salespilot-cookie-later-at';
const LATER_RESHOW_MS = 24 * 60 * 60 * 1000;

function shouldShowBanner() {
    if (typeof window === 'undefined') {
        return false;
    }

    const consent = window.localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted' || consent === 'necessary') {
        return false;
    }

    const laterAt = window.localStorage.getItem(LATER_KEY);
    if (!laterAt) {
        return true;
    }

    const elapsed = Date.now() - Number(laterAt);
    return elapsed > LATER_RESHOW_MS;
}

function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(shouldShowBanner());
    }, []);

    const saveChoice = (choice) => {
        window.localStorage.setItem(CONSENT_KEY, choice);
        window.localStorage.removeItem(LATER_KEY);
        setVisible(false);
    };

    const handleLater = () => {
        window.localStorage.setItem(LATER_KEY, String(Date.now()));
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <aside className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie 偏好設定">
            <div className="cookie-banner__content">
                <h3 className="cookie-banner__title">我們使用 Cookie 提升你的使用體驗</h3>
                <p className="cookie-banner__desc">
                    我們會使用必要 Cookie 維持網站運作，並在你同意後啟用分析 Cookie 以優化產品體驗。
                </p>
            </div>
            <div className="cookie-banner__actions">
                <button type="button" className="btn btn--primary btn--sm" onClick={() => saveChoice('accepted')}>
                    接受全部
                </button>
                <button type="button" className="btn btn--outline btn--sm" onClick={() => saveChoice('necessary')}>
                    僅必要
                </button>
                <button type="button" className="cookie-banner__later" onClick={handleLater}>
                    稍後再說
                </button>
            </div>
        </aside>
    );
}

export default CookieConsent;
