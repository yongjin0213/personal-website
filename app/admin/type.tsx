export type ContentBlock = 
  | { type: 'paragraph'; content: string }
  | { type: 'image'; url: string; alt: string };

export type AddParagraphProps = {
  onAddBlock: (block: ContentBlock) => void;
};