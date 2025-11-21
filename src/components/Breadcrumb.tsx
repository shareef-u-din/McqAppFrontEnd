"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/" }
    ];

    // Skip paths that don't have their own pages
    const skipPaths = ["practice"];
    
    let currentPath = "";
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Skip intermediate paths that don't have pages
      if (skipPaths.includes(path)) {
        return;
      }
      
      // Format the label
      let label = path
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      // Special formatting for known paths
      if (path === "jee") label = "JEE";
      if (path === "neet") label = "NEET";
      if (path === "gate") label = "GATE";
      if (path === "maths-jee") label = "Mathematics";
      if (path === "physics-neet") label = "Physics";
      if (path === "chemistry-neet") label = "Chemistry";
      if (path === "biology-neet") label = "Biology";
      if (path === "calculus") label = "Calculus";
      if (path === "mechanics") label = "Mechanics";
      if (path === "thermodynamics") label = "Thermodynamics";
      if (path === "organic-chemistry") label = "Organic Chemistry";
      if (path === "cell-biology") label = "Cell Biology";
      if (path === "limits") label = "Limits";
      if (path === "derivatives") label = "Derivatives";
      if (path === "integrals") label = "Integrals";
      if (path === "continuity") label = "Continuity";
      if (path === "applications") label = "Applications";
      if (path === "admin") label = "Admin";
      if (path === "questions") label = "Questions";
      if (path === "review") label = "Review";
      if (path === "create-question") label = "Create Question";
      if (path.startsWith("edit")) label = "Edit Question";
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page or if there's only home
  if (pathname === "/" || breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-container mb-4">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={crumb.href} className="breadcrumb-item">
              {!isLast ? (
                <>
                  <Link href={crumb.href} className="breadcrumb-link">
                    {isFirst && <FaHome className="breadcrumb-home-icon" aria-hidden="true" />}
                    <span className={isFirst ? "d-none d-sm-inline" : ""}>{crumb.label}</span>
                  </Link>
                  <FaChevronRight className="breadcrumb-separator" aria-hidden="true" />
                </>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
