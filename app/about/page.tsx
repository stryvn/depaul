import type { Metadata } from "next";
import Script from "next/script";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import "./about.css";

export const metadata: Metadata = {
  title: "About De Paul",
  openGraph: { title: "About De Paul | De Paul Public School Rajamudy", url: "/about" },
  alternates: { canonical: "/about" },
  description: "The history, values, leadership, faculty and campus of De Paul Public School & Junior College, Rajamudy.",
};

export default function AboutPage() {
  return (
    <>
      <TopNavbar isMerged={true} />
      <div className="about-editorial">
        <a className="skip" href="#main">Skip to content</a>
    <main id="main" tabIndex={-1}>
    <section className="hero wrap" aria-labelledby="title">
      <div className="hero-copy">
        <p className="label">Rajamudy, Idukki</p>
        <h1 id="title">About<br /> <span>De Paul</span></h1>
        <p className="motto">For God &amp; Country</p>
        <p className="lede">A Vincentian school in the hills of Idukki, educating students from LKG to Class XII.</p>
      </div>
      <figure className="hero-photo">
        <img src="/reference-about/assets/campus.webp" alt="Aerial view of De Paul’s school buildings and courtyard" fetchPriority="high" width="1280" height="720" />
        <figcaption>De Paul Public School &amp; Junior College</figcaption>
      </figure>
    </section>

    <nav className="topic-nav wrap" aria-label="About page sections">
      <a href="#history">History</a><a href="#values">Values</a><a href="#leadership">Leadership</a><a href="#faculty">Faculty</a><a href="#facilities">Facilities</a><a href="#school-day">School day</a>
    </nav>

    <div className="wrap content">
      <section id="history" className="topic split" aria-labelledby="history-title">
        <div className="section-copy">
          <p className="label">History</p>
          <h2 id="history-title">In Rajamudy since 2002</h2>
          <p>De Paul Public School &amp; Junior College was established in 2002. It is managed by the Vincentian Congregation, St. Joseph’s Province, Kottayam, and is affiliated with CBSE, New Delhi (Affiliation No. 930624).</p>
          <p>Since opening, De Paul has grown into one of Idukki district’s prominent schools, with classes from LKG to XII.</p>
        </div>
        <img className="section-photo history-photo" src="/reference-about/assets/environment.webp" alt="Members of the De Paul school community on campus" loading="lazy" />
      </section>

      <section id="values" className="topic split photo-first" aria-labelledby="values-title">
        <div className="section-copy">
          <p className="label">Values</p>
          <h2 id="values-title">Vision and mission</h2>
          <dl className="mission">
            <div><dt>Our vision</dt><dd>To develop knowledgeable and compassionate learners who contribute to their communities.</dd></div>
            <div><dt>Our mission</dt><dd>To offer varied educational programmes that help students become literate, caring, ethical and responsible citizens who can adapt to change.</dd></div>
            <div><dt>Our motto</dt><dd>For God and Country.</dd></div>
          </dl>
        </div>
        <img className="section-photo" src="/reference-about/assets/community.webp" alt="De Paul students and teachers learning together" loading="lazy" />
      </section>

      <section id="leadership" className="topic leadership" aria-labelledby="leadership-title">
        <div className="split">
          <div className="section-copy">
            <p className="label">Leadership</p>
            <h2 id="leadership-title">A message from the Principal</h2>
            <blockquote>“Our responsibility is to create an inspiring environment where these gifts are discovered, nurtured, and developed.”</blockquote>
            <p>An education rooted in values makes room for every child to discover their abilities. The school brings learning and character formation together, guided by service and compassion.</p>
          </div>
          <figure className="principal-portrait">
            <img className="section-photo" src="/reference-about/assets/principal.webp" alt="Rev. Fr. Benedict Kuruppamtharamukalel VC" loading="lazy" />
            <figcaption><strong>Rev. Fr. Benedict Kuruppamtharamukalel VC</strong><span>Principal, De Paul Public School &amp; Junior College</span></figcaption>
          </figure>
        </div>
        <div className="leadership-team" aria-label="School administration">
          <article className="team-member">
            <img src="/reference-about/assets/manager.webp" alt="Rev. Fr. George Arackal" width="120" height="120" loading="lazy" />
            <div><p>Manager</p><h3>Rev. Fr. George Arackal</h3></div>
          </article>
          <article className="team-member">
            <img src="/reference-about/assets/bursar.webp" alt="Fr. Aloshi Kozhuppathadathil VC" width="120" height="120" loading="lazy" />
            <div><p>Bursar</p><h3>Fr. Aloshi Kozhuppathadathil VC</h3></div>
          </article>
        </div>
      </section>

      <section id="faculty" className="topic split photo-first" aria-labelledby="faculty-title">
        <div className="section-copy">
          <p className="label">Faculty</p>
          <h2 id="faculty-title">Our teachers</h2>
          <p>Teachers support students from Kindergarten through Senior Secondary. Classroom teaching is complemented by practical work and opportunities to develop interests beyond the syllabus.</p>
          <a className="text-link" href="/docs">See the school’s faculty records</a>
        </div>
        <img className="section-photo" src="/reference-about/assets/classroom.webp" alt="A teacher working with students at De Paul" width="600" height="400" loading="lazy" />
      </section>

      <section id="facilities" className="topic split" aria-labelledby="facilities-title">
        <div className="section-copy">
          <p className="label">Facilities</p>
          <h2 id="facilities-title">Learning by doing</h2>
          <p>Science and computing labs give students room for practical work. Classrooms, the library and sports grounds support study, recreation and activities beyond the classroom.</p>
          <a className="text-link" href="https://depaulidukki.com/gallery/">Explore the campus gallery</a>
        </div>
        <img className="section-photo" src="/reference-about/assets/learning.webp" alt="De Paul students taking part in a practical science activity" width="600" height="400" loading="lazy" />
      </section>

      <section id="school-day" className="topic split photo-first" aria-labelledby="school-day-title">
        <div className="section-copy">
          <p className="label">School day</p>
          <h2 id="school-day-title">School hours and classes</h2>
          <dl className="school-facts">
            <div><dt>School hours</dt><dd><time dateTime="09:30">9:30 am</time> – <time dateTime="15:50">3:50 pm</time></dd></div>
            <div><dt>Classes offered</dt><dd>LKG to XII</dd></div>
          </dl>
          <a className="text-link" href="/contact">Visit admissions</a>
        </div>
        <img className="section-photo" src="/reference-about/assets/sports.webp" alt="De Paul students taking part in school sports" loading="lazy" />
      </section>
    </div>
      </main>
      </div>
      <Footer />
      <Script src="/reference-about/about.js" strategy="afterInteractive" />
    </>
  );
}
