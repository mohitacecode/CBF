import _ from "@lodash";

export const CarouselTrayConfig = {
  icon: "view_carousel",
  nodeType: "CAROUSEL",
  primaryText: "Image Carousel",
  secondaryText: "Display an Carousel in the Chat",
  questionText: "Carousel Caption",
  no_images: 2,
  carousel_url: [" "],
  link_carousel: [" "],
  isUrlValid: [true],
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
