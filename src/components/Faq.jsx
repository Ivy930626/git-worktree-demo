import { FAQ_ITEMS } from '../data/faq';

function Faq() {
    return (
        <section id="faq" className="faq" aria-labelledby="faq-title">
            <div className="container">
                <header className="section-header">
                    <span className="section-header__badge">FAQ</span>
                    <h2 id="faq-title" className="section-header__title">常見問題</h2>
                    <p className="section-header__desc">
                        幫你快速了解導入方式、資料安全與上線支援流程。
                    </p>
                </header>

                <div className="faq__list">
                    {FAQ_ITEMS.map((item) => (
                        <details key={item.question} className="faq__item">
                            <summary className="faq__question">{item.question}</summary>
                            <p className="faq__answer">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Faq;
