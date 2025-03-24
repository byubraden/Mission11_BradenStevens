import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-5">
        {/* Page Title */}
        <h2 className="text-center mb-4 font-weight-bold">Explore Books</h2>

        <div className="row">
          {/* Category Filter Section */}
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm p-3">
              <h4 className="card-title mb-3">Filter by Categories</h4>
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>

          {/* Book List Section */}
          <div className="col-md-9">
            <div className="card shadow-sm p-3">
              <BookList selectedCategories={selectedCategories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
