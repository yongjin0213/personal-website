'use client'

import Image from 'next/image'

export default function BlogContentDisplay({ post }){
    const content = post?.content?.blocks || [];
    
    if (content.length === 0) {
        return <div>No content available</div>;
    }
    
    return (
      <section className="animate-slide-in animate-delay-1 rounded-3xl border border-[var(--green-muted)] bg-[var(--green-surface)] px-8 py-10 text-base leading-7 text-[color:rgba(31,45,31,0.8)] shadow-sm">
        <div className="flex flex-col gap-6">
            {content.map((sec, index) => {
                console.log(sec)
                if (sec.type === 'paragraph') {
                    return <p key={index} className="text-black">{sec.content}</p>
                } 
                else if (sec.type === 'image') {
                    return <Image
                        key={index}
                        src={sec.url}
                        width={200}
                        height={200}
                        alt={sec.alt}
                    />
                } else {
                    return null;
                }
            })}
        </div>
      </section>
    ) 
};