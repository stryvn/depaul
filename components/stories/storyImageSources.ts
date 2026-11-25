const optimizedCovers: Record<string, string> = {
  "/assets/stories/learning-in-the-lab.webp": "biology-lab",
  "/assets/stories/track-and-field.webp": "track-and-field",
  "/assets/stories/environment-day.webp": "environment-day",
  "/assets/stories/childrens-day.webp": "childrens-day",
  "/assets/stories/nexora.webp": "nexora",
  "/assets/stories/sports-day.webp": "sports-day",
  "/assets/events/sportsday01.jpeg": "sports-day",
  "/assets/events/Nexora2k26.jpeg": "nexora",
  "/assets/events/childrensday.jpeg": "childrens-day",
  "/assets/events/environmentday.jpg": "environment-day",
  "/assets/events/sportsday02.jpeg": "track-and-field",
  "/assets/attachments/biologylab.jpg": "biology-lab",
};

export function storyImageSources(src: string) {
  const name = optimizedCovers[src];
  if (!name) return { src };

  const path = `/assets/story-covers/${name}`;
  return {
    src: `${path}-720.webp`,
    srcSet: [192, 384, 720, 1200].map(width => `${path}-${width}.webp ${width}w`).join(", "),
  };
}
