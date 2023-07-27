import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-cool-gray-90 py-8 px-6">
      <div className="container mx-auto flex md:flex-row flex-col gap-4 lg:ml-[90px]">
        {[
          {label: 'About', link: '/about'}
        ].map((item) => (
          <span
            key={item.label}
            className="font-normal text-base text-white text-left"
          >
            {item.link ? (
              <Link href={item.link}>
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </span>
        ))}
      </div>
      <div className="container mx-auto mt-6">
        <p className="md:text-end text-start font-normal text-sm text-white ml-auto mr-[90px]">
          &copy; {new Date().getFullYear()} サクマ ナツ
        </p>
      </div>
    </footer>
    )
}

export default Footer;