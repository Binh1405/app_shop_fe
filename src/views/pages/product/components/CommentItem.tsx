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
import { TCommentItemProduct } from "src/types/comment";

interface TProps {
    item: TCommentItemProduct
}

const CommentItem = ({ item }: TProps) => {
    const { t, i18n } = useTranslation()
    const [isReply, setIsReply] = useState(false)

    const handleCancelReply = () => {
        setIsReply(false)
    }

    const handleReply = (comment: string) => {

    }

    let level: number = -1
    const renderComment = (item: TCommentItemProduct) => {
        level += 1

        return (
            <Box>
                <Box sx={{ marginLeft: `${80 * level}px` }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={item.user?.avatar} />
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography>
                                        {toFullName(
                                            item?.user?.lastName || '',
                                            item?.user?.middleName || '',
                                            item?.user?.firstName || '',
                                            i18n.language
                                        )}
                                    </Typography>
                                    <Typography color="secondary">{getTimePast(new Date(item.createdAt), t)}</Typography>
                                </Box>
                            </Box>
                            <Typography>{item?.content}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, ml: "80px" }}>
                        <Button variant="text" sx={{ mt: 1, height: "30px", backgroundColor: "transparent !important" }} onClick={() => setIsReply(true)}>
                            {t("Reply")}
                        </Button>
                        <Button variant="text" sx={{ mt: 1, height: "30px", backgroundColor: "transparent !important" }} onClick={() => setIsReply(true)}>
                            {t("Edit")}
                        </Button>
                        <Button variant="text" sx={{ mt: 1, height: "30px", backgroundColor: "transparent !important" }}>
                            {t("Delete")}
                        </Button>
                    </Box>
                    {isReply && (
                        <Box sx={{ ml: "80px", mt: -2 }}>
                            <CommentInput onCancel={handleCancelReply} onApply={handleReply} />
                        </Box>
                    )}
                </Box>
                {
                    item?.replies && item?.replies?.length > 0 && (
                        <>
                            {item?.replies?.map((rep: TCommentItemProduct) => {
                                return (
                                    <>{renderComment(rep)}</>
                                )
                            })}
                        </>
                    )
                }
            </Box>
        )
    }

    return (
        <Box>
            {renderComment(item)}
        </Box>
    )

}

export default CommentItem