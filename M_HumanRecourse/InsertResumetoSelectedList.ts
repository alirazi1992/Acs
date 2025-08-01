import Swal from "sweetalert2";
import themeStore from '@/app/zustandData/theme.zustand';
import useStore from "@/app/hooks/useStore";
import SetSelectedResume from "@/app/Servises-AsiaApp/M_HumanResources/SetSelectedResume";

export const InsertingselctedResume = () => {
    const themeMode = useStore(themeStore, (state) => state)
    const { Function } = SetSelectedResume()
    const AddResumetoList = async (item: any) => {
        const result = await Swal.fire({
            background: !themeMode || themeMode?.stateMode == true ? "#22303c" : "#eee3d7",
            color: !themeMode || themeMode?.stateMode == true ? "white" : "#463b2f",
            allowOutsideClick: false,
            title: "Add to favorites!",
            text: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!"
        })
        if (result.isConfirmed) {
            const response = await Function(item);
            if (response) {
                if (response.status == 401) {
                    return response.data.message
                }else{
                if (response.data.status && response.data.data) {
                    return response.data.data
                } else {
                    Swal.fire({
                        background: !themeMode || themeMode?.stateMode == true ? "#22303c" : "#eee3d7",
                        color: !themeMode || themeMode?.stateMode == true ? "white" : "#463b2f",
                        allowOutsideClick: false,
                        title: "Add to favorites!",
                        text: response.data.message,
                        icon: response.data.status ? "warning" : "error",
                        confirmButtonColor: "#22c55e",
                        confirmButtonText: "Ok!"
                    })
                }}
            }
        } else {
            const res = 'dissmiss'
            return res
        }
    }
    return { AddResumetoList };
}