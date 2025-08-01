import { Radio, RadioProps, styled } from "@mui/material";
import colorStore from '@/app/zustandData/color.zustand';
import useStore from "@/app/hooks/useStore";
const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode ===
            'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor:
        theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)<{ color: string }>(({ color }) => ({
    backgroundColor: color,
    backgroundImage: 'linear-gradient(180deg,#818cf810,hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: color,
    },
}), { index: 1 });

export function BpRadioCom(props: RadioProps & { color?: string }) { // اضافه کردن color به props
    const color = useStore(colorStore, (state) => state);
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon color={color?.color} />} // پاس دادن color به BpCheckedIcon
            icon={<BpIcon />}
            {...props}
        />
    );
}
