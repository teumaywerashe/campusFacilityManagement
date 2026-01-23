import Comment from "../models/coments.js";
export const createComment = async(req, res) => {
    const { content, reportId } = req.body;
    console.log(req.user);
    try {
        const comment = await Comment.create({
            content,
            reportId,
            userId: req.userId,
        });

        if (!comment)
            return res
                .status(404)
                .json({ success: false, msg: "no comment created" });
        res.status(201).json({ success: true, comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

export const deleteComment = async(req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);
        if (!comment)
            return res.status(404).json({ success: false, msg: "comment not found" });

        res.status(200).json({ success: true, comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};