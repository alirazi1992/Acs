'use client'
import Swal from "sweetalert2";
import themeStore from '@/app/zustandData/theme.zustand';
import useStore from "@/app/hooks/useStore";
import UpdateCourseProgram from "@/app/Servises-AsiaApp/M_Education/UpdateProgram";
import { ProgramItemsModel } from "@/app/Domain/M_Education/Programs";

export const UpdatingCourseProgram = () => {
    const themeMode = useStore(themeStore, (state) => state)
    const { Function } = UpdateCourseProgram()
    const UpdateProgram = async (dataItems: ProgramItemsModel) => {
        const response = await Function(dataItems);
        if (response) {
            if (response.status == 401) {
                return response.data.message
            } else {
                if (response.data.status && response.data.data != null) {
                    return response.data.data
                } else {
                    return Swal.fire({
                        background: !themeMode || themeMode?.stateMode == true ? "#22303c" : "#eee3d7",
                        color: !themeMode || themeMode?.stateMode == true ? "white" : "#463b2f",
                        allowOutsideClick: false,
                        title: "Update Course Program!",
                        text: response.data.message,
                        icon: response.data.status == true ? "warning" : 'error',
                        confirmButtonColor: "#22c55e",
                        confirmButtonText: "Ok!"
                    })
                }
            }
        }
    }
    return { UpdateProgram };
}