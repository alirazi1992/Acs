"use client";

import MyCustomComponent from "@/app/EndPoints-AsiaApp/Components/Shared/CustomTheme_Mui";
import { ProcessesContainer } from "./_components/ProcessesContainer";

const ProcessesPage = () => {
  return (
    <div dir="rtl">
      <MyCustomComponent>
        <ProcessesContainer />
      </MyCustomComponent>
    </div>
  );
};

export default ProcessesPage;
