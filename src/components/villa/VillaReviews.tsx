import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    author: 'Chayadom',
    rating: 5,
    date: '2025-02-15',
    comment: 'บ้านดี วิวสวย บรรยากาศดี เงียบสงบ เหมาะกับการพักผ่อนสุดๆ',
    avatar: 'public/IMG_9468.JPG'
  },
  {
    id: 2,
    author: 'Wiphada',
    rating: 4,
    date: '2025-02-10',
    comment: 'สนุกมากค่ะ บ้านมีครบทุกอย่าง ถ่ายรูปสวยทุกมุม',
    avatar: 'public/IMG_9466.JPG'
  },
  {
    id: 3,
    author: 'Kodchaporn',
    rating: 5,
    date: '2025-02-05',
    comment: 'ห้องพักสะอาด กว้าง บริการดีมาก กลับมาอีกแน่นอน!',
    avatar: 'public/IMG_9467.JPG'
  }
];

export function VillaReviews() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Guest Reviews</h2>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-amber-400 fill-current" />
          <span className="font-medium">4.8</span>
          <span className="text-gray-500 dark:text-amber-400">(168 reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {review.author}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-amber-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-amber-400 fill-current'
                          : 'text-amber-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
