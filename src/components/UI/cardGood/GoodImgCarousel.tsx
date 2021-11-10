import * as React from "react";
import { FC } from "react";
import Box from "@mui/material/Box";
import { blue, grey } from "@mui/material/colors";
import { IGoodImages } from "../../../models/goodModel";
import emptyImg from "../../../static/images/empty_img.png";

const IMG_WIDTH = 350;
const IMG_HEIGHT = 300;

type GoodCarouselProps = {
    images: IGoodImages[]
}

const GoodImgCarousel: FC<GoodCarouselProps> = ({ images }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    return (
        <Box sx={ { width: IMG_WIDTH, height: IMG_HEIGHT, flexGrow: 1, position: "relative" } }>
            <Box>
                {
                    maxSteps === 0
                        ?
                        <Box
                            component="img"
                            sx={ {
                                height: IMG_HEIGHT,
                                display: "block",
                                width: IMG_WIDTH,
                                overflow: "hidden",
                                zIndex: 2,
                                borderRadius: theme => theme.spacing(1)
                            } }
                            src={ emptyImg }
                            alt={ "Not found" }
                        />
                        :
                        <Box
                            component="img"
                            sx={ {
                                height: IMG_HEIGHT,
                                display: "block",
                                width: IMG_WIDTH,
                                overflow: "hidden",
                                zIndex: 2,
                                borderRadius: theme => theme.spacing(1)
                            } }
                            src={ images[activeStep].path }
                            alt={ images[activeStep].title }
                        />
                }

            </Box>
            <Box
                sx={ {
                    bottom: 0,
                    display: "flex",
                    left: 0,
                    position: "absolute",
                    right: 0,
                    top: 0,
                    zIndex: 4
                } }
            >
                { [...new Array(maxSteps)].map((_, index) => {
                    return (
                        <Box
                            key={ index }
                            sx={ {
                                flex: "1 1 auto",
                                height: "100%",
                                zIndex: 3
                            } }
                            onMouseEnter={ () => {
                                setActiveStep(index);
                            } }
                        />
                    );
                }) }
                <Box
                    sx={ {
                        alignItems: "center",
                        bottom: "-6px",
                        display: "flex",
                        height: "6px",
                        justifyContent: "center",
                        left: 0,
                        position: "absolute",
                        width: "100%"
                    } }
                >
                    { [...new Array(maxSteps)].map((_, index) => {
                        return (
                            <Box
                                key={ index }
                                sx={ {
                                    background: index === activeStep ? blue[800] : grey[300],
                                    borderRadius: "100%",
                                    height: "5px",
                                    ml: "2px",
                                    width: "5px"
                                } }
                                onMouseEnter={ () => {
                                    setActiveStep(index);
                                } }
                            />
                        );
                    }) }
                </Box>
            </Box>
        </Box>
    );
};

export default GoodImgCarousel;