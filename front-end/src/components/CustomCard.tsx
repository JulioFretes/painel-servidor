import { Box, Typography } from "@mui/material";

interface ICard {
    title?: string | React.ReactNode | undefined;
    children: React.ReactNode;
}

const CustomCard = ({ title, children }: ICard) => {
    const styles = {
        contentCard: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(71, 71, 71)",
            padding: "0.8rem 2rem",
            minWidth: "250px",
        },
        bottom: {
            borderRadius: "0 0 8px 8px",
        },
        card: {
            borderRadius: "8px",
            display: "flex",
            flexWrap: "wrap",
            gridRowGap: "0.6rem",
        },
    };
    const styleCard = title
        ? { ...styles.contentCard, ...styles.bottom }
        : { ...styles.contentCard, ...styles.card };

    return (
        <Box
            sx={{
                border: "none",
                display: "grid",
                flexDirection: "column",
                margin: "1rem",
            }}
        >
            {title && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "darkslategray",
                        height: "50px",
                        padding: "0 1rem,",
                        borderRadius: "8px 8px 0 0",
                    }}
                >
                    {typeof title === "string" ? (
                        <Typography variant="h6">{title}</Typography>
                    ) : (
                        title
                    )}
                </Box>
            )}
            <Box sx={styleCard}>{children}</Box>
        </Box>
    );
};

export default CustomCard;
