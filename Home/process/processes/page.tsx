"use client";
import MyCustomComponent from "@/app/EndPoints-AsiaApp/Components/Shared/CustomTheme_Mui";
import React from "react";

const page = () => {
  return (
    <div dir="rtl">
      <MyCustomComponent>
        <div>
          <h1>test</h1>
          page
        </div>
      </MyCustomComponent>
    </div>
  );
};

export default page;
