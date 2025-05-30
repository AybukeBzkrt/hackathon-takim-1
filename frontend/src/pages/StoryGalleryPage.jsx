import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StoryCard from "../components/cards/StoryCard";
import SkeletonCard from "../components/cards/SkeletonCard";
import SectionTitle from "../components/ui/SectionTitle";
import apiClient from "../api/apiClient";

function StoryGalleryPage() {
  const [featuredStories, setFeaturedStories] = useState([]);
  const [newStories, setNewStories] = useState([]);
  const [popularStories, setPopularStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API functions
  const fetchFeaturedStories = async (limit = 3) => {
    try {
      const response = await apiClient.get("/api/stories/featured", {
        params: { limit },
      });
      return response.data.stories;
    } catch (error) {
      console.error("Error fetching featured stories:", error);
      throw error;
    }
  };

  const fetchNewStories = async (limit = 4) => {
    try {
      const response = await apiClient.get("/api/stories/new", {
        params: { limit },
      });
      return response.data.stories;
    } catch (error) {
      console.error("Error fetching new stories:", error);
      throw error;
    }
  };

  const fetchPopularStories = async (limit = 4) => {
    try {
      const response = await apiClient.get("/api/stories/popular", {
        params: { limit },
      });
      return response.data.stories;
    } catch (error) {
      console.error("Error fetching popular stories:", error);
      throw error;
    }
  };

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      console.log("StoryGalleryPage: Starting data load..."); // Log start

      try {
        // Fetch data in parallel
        const [featured, newOnes, popular] = await Promise.all([
          fetchFeaturedStories(),
          fetchNewStories(),
          fetchPopularStories(),
        ]);

        setFeaturedStories(featured);
        setNewStories(newOnes); // Check the value of newOnes here
        setPopularStories(popular);

        console.log("StoryGalleryPage: State update attempted."); // Log state update attempt
      } catch (err) {
        setError("Failed to load stories. Please try again later.");
        console.error("StoryGalleryPage: Error loading story data:", err); // Log error
      } finally {
        setIsLoading(false);
        console.log("StoryGalleryPage: Loading finished."); // Log finish
      }
    };

    loadData();
  }, []);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 hover:cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        {/* Page Header - Modified to include Create Story button */}
        <div className="mb-10 text-center relative">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hikaye Galerisi
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Keşfetmeyi bekleyen birbirinden güzel eğitici hikayeler arasından
            seçim yapın
          </motion.p>

          {/* Create Story Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/stories/create">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:cursor-pointer hover:from-purple-700 hover:to-blue-600 text-white rounded-full font-medium shadow-lg flex items-center mx-auto"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Yeni Hikaye Oluştur
              </motion.button>
            </Link>
          </motion.div>

          {/* AI Generate Story Button */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/stories/ai-generate">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:cursor-pointer hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-medium shadow-lg flex items-center mx-auto"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(139, 92, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.6 13.47A7 7 0 0 0 15 10a7 7 0 0 0-7-7 7 7 0 0 0-5 11.95V16h2v-2h2v-2h2v-2h1.7a7.001 7.001 0 0 0 .3-1.53zM7 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                    clipRule="evenodd"
                  />
                </svg>
                AI ile Hikaye Oluştur
                <span className="ml-2 animate-pulse text-yellow-200">✨</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Featured Stories Section */}
        <section className="mb-16">
          <SectionTitle title="Öne Çıkan Hikayeler" />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={`featured-skeleton-${i}`} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {featuredStories.map((story) => (
                <StoryCard
                  key={`featured-${story.id}`}
                  story={{
                    ...story,
                    publishedDate: story.published_date,
                  }}
                  featured={true}
                />
              ))}
            </motion.div>
          )}
        </section>

        {/* New Stories Section */}
        <section className="mb-16">
          <SectionTitle title="Yeni Hikayeler" viewAllLink="/stories/new" />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={`new-skeleton-${i}`} />
              ))}
            </div>
          ) : newStories.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {newStories.map((story) => {
                return (
                  <StoryCard
                    key={`new-${story.id}`}
                    story={{
                      id: story.id,
                      title: story.title,
                      image:
                        story.image ||
                        "https://placehold.co/600x400/EEE/31343C",
                      description: story.description || "No description",
                      likes: story.likes || 0,
                      category: story.category || "General",
                      publishedDate:
                        story.published_date || new Date().toISOString(),
                    }}
                  />
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Şu anda yeni hikaye bulunmamaktadır.
            </div>
          )}
        </section>

        {/* Popular Stories Section */}
        <section className="mb-16">
          <SectionTitle
            title="Popüler Hikayeler"
            viewAllLink="/stories/popular"
          />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={`popular-skeleton-${i}`} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {popularStories.map((story) => (
                <StoryCard
                  key={`popular-${story.id}`}
                  story={{
                    ...story,
                    publishedDate: story.published_date,
                  }}
                />
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StoryGalleryPage;
