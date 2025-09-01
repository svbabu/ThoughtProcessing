import React from 'react';

export function Header() {
    return (
        <section className="welcome-section">
            <h2 className="destiny-heading">
                I'm & We're looking forward to reach the destiny...
            </h2>

            <h2 className="typed-text-output d-inline" aria-live="polite"></h2>
            <div className="typed-text d-none">
                Web Designer, Web Developer, Front-End Architect, Apps Designer, Apps Developer
            </div>
        </section>
    );
}
