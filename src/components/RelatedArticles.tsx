import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";

interface RelatedArticlesProps {
  currentSlug?: string;
  maxItems?: number;
}

const caseStudyArticles = [
  { slug: "/unmasking-adam-howell", title: "Unmasking Adam Howell: Serial Scammer & Crypto Fraudster", tag: "Case Study" },
  { slug: "/superdoge-rug-pull", title: "SuperDoge Rug Pull: Charity-Fueled Crypto Scam Exposed", tag: "Case Study" },
  { slug: "/investigative-report", title: "Adam Howell's Ventures in Crypto and Beyond", tag: "Investigation" },
  { slug: "/superdoge-scam-update", title: "SuperDoge Scam Update: Anonymous Pitch & Vanished Promises", tag: "Update" },
  { slug: "/keith-shingleton-david-edwards", title: "Keith Shingleton, David Edwards & Adam Howell Connections", tag: "Associates" },
  { slug: "/the-architect-of-deception-and-adam-howells-web-of-accomplices", title: "The Architect of Deception: Adam Howell's Web of Accomplices", tag: "Network" },
];

const RelatedArticles = ({ currentSlug, maxItems = 6 }: RelatedArticlesProps) => {
  // Mix case studies and blog articles, excluding current
  const blogLinks = blogArticles
    .filter((a) => `/blog/${a.slug}` !== currentSlug && a.slug !== currentSlug)
    .slice(0, 3)
    .map((a) => ({ slug: `/blog/${a.slug}`, title: a.title, tag: a.tags[0] }));

  const caseLinks = caseStudyArticles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  const allLinks = [...caseLinks, ...blogLinks].slice(0, maxItems);

  return (
    <div className="mt-16 pt-10 border-t border-border">
      <h3 className="text-xl font-bold mb-6 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        Related Articles & Warnings
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {allLinks.map((link) => (
          <Link
            key={link.slug}
            to={link.slug}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowRight className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{link.tag}</span>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                {link.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
