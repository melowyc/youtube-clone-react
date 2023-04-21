import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
    const categoryEdu = categories.filter((item) => item.name === 'Education')
    console.log(categoryEdu)
    
    return(
    <Stack
        direction="row"
        sx={{
            overflowY: "auto",
            height: { sx: "auto", md: "95%" },
            flexDirection: { md: "column" },
        }}
    >
        {categoryEdu.map((category) => (
            <button
                className="category-btn"
                onClick={() => setSelectedCategory(category.name)}
                style={{
                    background: category.name === selectedCategory && "#FC1503",
                    color: "black",
                }}
                key={category.name}
            >
                <span style={{ color: category.name === selectedCategory ? "black" : "red", marginRight: "15px" }}>
                    {category.icon}
                </span>
                <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
                    {category.name}
                </span>
            </button>
        ))}
    </Stack>
    )
};

export default Categories;
