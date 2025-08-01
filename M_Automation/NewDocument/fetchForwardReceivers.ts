import Swal from "sweetalert2";
import themeStore from '@/app/zustandData/theme.zustand';
import useStore from "@/app/hooks/useStore";
import GetForwardReceivers from "@/app/Servises-AsiaApp/M_Automation/NewDocument/GetForwardReceivers";

export const useForwardReceivers = () => {
    const themeMode = useStore(themeStore, (state) => state)
    const { Function } = GetForwardReceivers()
    const fetchForwardReceivers = async () => {
        try {
            const response = await Function();
            if (response.status == 401) {
                return response.data.message
            }else{
            if (response.data.data && response.data.data.length > 0 && response.data.status == true) {
                return response.data.data
            } else {
                const res = Swal.fire({
                    background: !themeMode ||themeMode?.stateMode == true ? "#22303c" : "#eee3d7",
                    color: !themeMode ||themeMode?.stateMode == true ? "white" : "#463b2f",
                    allowOutsideClick: false,
                    title: "Get Forward Receivers",
                    text: response.data.message,
                    icon: response.data.status ? "warning" : "error",
                    confirmButtonColor: "#22c55e",
                    confirmButtonText: "Ok!"
                })
                return res
            }}
        } catch (error) {
            const res = 'dissmiss'
            return res
        }
    }
    return { fetchForwardReceivers };
};