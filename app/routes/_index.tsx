import { useCallback, useState } from 'react';
import type { MetaFunction } from 'react-router';
import { Input } from '~/components/Input';
import { ParticlesContainer } from '~/components/ParticlesContainer';
import { PixelatedImage } from '~/components/PixelatedImage';
import { Avatar } from '~/components/icons/Avatar';
import { Chevron } from '~/components/icons/Chevron';
import { ImageUpload } from '~/components/icons/ImageUpload';
import { XMark } from '~/components/icons/XMark';

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
  const [isBioExpanded, setIsBioExpanded] = useState(false);

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

  const handleCancelImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <>
      <nav
        className="absolute top-4 right-5 z-10 flex flex-col items-end gap-2 md:top-8 md:right-10"
        aria-label="Main navigation"
      >
        <a
          className="group inline-flex items-center text-sm font-bold text-gray-600 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
          href="/about"
          aria-label="Read more about Caleb Brown"
        >
          About Me{' '}
          <Chevron
            className="ml-2 scale-x-[-1] transform transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
        <a
          className="group inline-flex items-center text-sm font-bold text-gray-600 transition-colors hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
          href="/projects"
        >
          View Work <Chevron className="ml-2 scale-x-[-1] transform transition-transform group-hover:translate-x-1" />
        </a>
      </nav>
      <div className="absolute top-4 left-5 z-10 md:top-8 md:left-10">
        <div className="md:hidden">
          <button
            onClick={() => setIsBioExpanded(!isBioExpanded)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            aria-expanded={isBioExpanded}
          >
            <Avatar />
            <span className="font-bold">Hi, I'm Caleb</span>
          </button>
          {isBioExpanded && (
            <p className="mt-2 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              I'm a full-stack engineer based in Austin, TX. I specialize in building exceptional digital experiences.
            </p>
          )}
        </div>
        <div className="hidden max-w-xs text-sm text-gray-600 md:block dark:text-gray-400">
          <p className="flex items-center gap-4">
            <Avatar />
            <span>
              <span className="font-bold">Hi, I'm Caleb</span> — a full-stack engineer based in Austin, TX. I specialize
              in building exceptional digital experiences.
            </span>
          </p>
        </div>
      </div>
      <main className="fixed inset-0 h-[100dvh] w-[100dvw]">
        <div className="sr-only">
          This is an interactive area where you can enter text to see particle animations or upload an image to display.
        </div>
        <div className="fixed bottom-20 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center justify-center gap-2 p-4 md:bottom-6">
          <Input
            onChange={handleWordChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={word}
            disabled={!!selectedImage} // Disable input if there's an image
          />
          {selectedImage ? (
            <button
              onClick={handleCancelImage}
              className="flex w-[80%] max-w-[300px] cursor-pointer justify-center rounded-md bg-red-500 p-2 text-white transition-all duration-300 hover:bg-red-600"
              aria-label="Remove image"
            >
              <XMark className="h-5 w-5" />
            </button>
          ) : (
            <label
              className="flex w-[80%] max-w-[300px] cursor-pointer justify-center rounded-md bg-indigo-500 p-2 text-white transition-all duration-300 hover:bg-indigo-600"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }}
              aria-label="Upload image"
            >
              <ImageUpload />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
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
