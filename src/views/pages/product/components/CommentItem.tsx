// ** React
import { useTranslation } from "react-i18next"
import { useState } from "react";

// ** Mui
import { Avatar, Box, Button, Typography } from "@mui/material"

// ** Utils
import { toFullName } from "src/utils";
import { getTimePast } from "src/utils/date";

// ** Components
import CommentInput from "src/views/pages/product/components/CommentInput";

const CommentItem = () => {
    const { t } = useTranslation()
    const [isReply, setIsReply] = useState(false)

    const handleCancelReply = () => {
        setIsReply(false)
    }

    const handleReply = (comment:string) => {
         
    }

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={"/"} />
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography>
                                {/* {toFullName(
                            item?.user?.lastName || '',
                            item?.user?.middleName || '',
                            item?.user?.firstName || '',
                            i18n.language
                        )} */}
                                {toFullName(
                                    "Khánh" || '',
                                    "Duy" || '',
                                    "Nguyễn" || '',
                                    "vi"
                                )}
                            </Typography>
                            <Typography color="secondary">{getTimePast(new Date(), t)}</Typography>
                        </Box>
                    </Box>
                    <Typography>Home nay tuyet vơi</Typography>
                </Box>
            </Box>
            <Button variant="text" sx={{ mt: 1,height: "30px", ml: "80px", backgroundColor: "transparent !important" }} onClick={() => setIsReply(true)}>{t("Reply")}</Button>
            {isReply && (
                <Box sx={{ ml: "80px", mt: -2 }}>
                    <CommentInput onCancel={handleCancelReply} onApply={handleReply} />
                </Box>
            )}
        </Box>
    )

}

export default CommentItem