import { useCallback, useState } from 'react';
import type { MetaFunction } from 'react-router';
import { Input } from '~/components/Input';
import { ParticlesContainer } from '~/components/ParticlesContainer';
import { PixelatedImage } from '~/components/PixelatedImage';
import { Chevron } from '~/components/icons/Chevron';
import { ImageUpload } from '~/components/icons/ImageUpload';

export const meta: MetaFunction = () => {
  return [
    { title: 'Caleb Brown - Software Engineer Austin, TX - kayluhb' },
    {
      name: 'description',
      content:
        'Caleb is an experienced full-stack engineer based in Austin, TX, specializing in web development, systems administration, and technology consulting. With a strong background in leading engineering teams and collaborating with UX designers, designers, and project managers, Caleb ensures seamless website and application development. He offers contracting services for full-stack development and consulting for new business pitches, team growth, and technical assessments. Always eager to explore new technologies and programming languages, Caleb brings expertise and innovation to every project.',
    },
  ];
};

export default function Index() {
  const [word, setWord] = useState('KAYLUHB');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleWordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = e.target.value.toUpperCase();
    setWord(newWord);
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <>
      <nav className="absolute top-8 right-10 z-10 flex flex-col items-end gap-2">
        <a
          className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
          href="/about"
        >
          About Me <Chevron className="ml-2 scale-x-[-1]" />
        </a>
        <a
          className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
          href="/projects"
        >
          Past Projects <Chevron className="ml-2 scale-x-[-1]" />
        </a>
      </nav>
      <div className="absolute top-8 left-10 z-10 max-w-xs">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hi, I'm Caleb — a full-stack engineer based in Austin, TX. I specialize in building exceptional digital
          experiences.
        </p>
      </div>
      <main className="fixed inset-0 h-[100dvh] w-[100dvw]">
        <div className="sr-only">
          This is an interactive area where you can enter text to see particle animations or upload an image to display.
        </div>
        <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 p-4 md:bottom-6">
          <Input
            onChange={handleWordChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={word}
          />
          <label className="cursor-pointer rounded-md bg-indigo-500 p-2 text-white hover:bg-indigo-600">
            <ImageUpload />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        {selectedImage ? (
          <div className="h-full w-full">
            <PixelatedImage imageUrl={selectedImage} />
          </div>
        ) : (
          <ParticlesContainer isInputFocused={isInputFocused} word={word} />
        )}
      </main>
    </>
  );
}
