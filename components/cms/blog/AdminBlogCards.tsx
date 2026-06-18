"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import type { BlogPostRecord } from "@/lib/cms/blog/mappers";
import useBlogForm from "@/store/useBlogForm";
import useConfirmModal from "@/store/useConfirmModal";
import ConfirmModal, { ModalEnum } from "@/components/Modals/confirm-modal";
import BlogFormModal from "./BlogFormModal";
import BlogStatusBadge from "./BlogStatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AdminBlogCardsProps = {
  accessToken: string;
  onUnauthorized: () => void;
};

export default function AdminBlogCards({
  accessToken,
  onUnauthorized,
}: AdminBlogCardsProps) {
  const [formType, setFormType] = useState<"post" | "put">("post");
  const [currentPost, setCurrentPost] = useState<BlogPostRecord>();
  const [deletingId, setDeletingId] = useState<number>();
  const [deletionLoading, setDeletionLoading] = useState(false);
  const { isOpen, setFormState } = useBlogForm();
  const { isModalOpen, setModalState } = useConfirmModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const response = await axios.get<BlogPostRecord[]>("/api/blog/admin", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    },
  });

  const handleAdd = () => {
    setCurrentPost(undefined);
    setFormType("post");
    setFormState(true);
  };

  const handleEdit = (post: BlogPostRecord) => {
    setCurrentPost(post);
    setFormType("put");
    setFormState(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setModalState(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeletionLoading(true);

    try {
      const response = await axios.delete(`/api/blog/admin/${deletingId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const deleted = response.data.deleted as BlogPostRecord;
      toast({
        title: "Deleted",
        description: `"${deleted.titleEn}" was removed.`,
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        onUnauthorized();
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      });
    } finally {
      setDeletionLoading(false);
      setModalState(false);
      setDeletingId(undefined);
    }
  };

  return (
    <div className="flex min-h-[110vh] flex-col items-center justify-center gap-4 pt-[150px]">
      <Button
        className="float w-[50%] items-center justify-center bg-green-400 hover:bg-green-300"
        onClick={handleAdd}
      >
        Add blog post
      </Button>

      <AnimatePresence>
        {isOpen ? (
          <BlogFormModal
            type={formType}
            post={currentPost}
            accessToken={accessToken}
            onUnauthorized={onUnauthorized}
          />
        ) : null}
      </AnimatePresence>

      {isModalOpen ? (
        <ConfirmModal
          description="This action cannot be undone."
          onSubmit={handleDelete}
          title="Delete this blog post"
          type={ModalEnum.Delete}
          submitText="Delete forever"
          isLoading={deletionLoading}
        />
      ) : null}

      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[120px] w-full animate-pulse rounded-xl bg-white/5"
            />
          ))
        : null}

      {data?.map((post) => (
        <div
          key={post.id}
          className="flex w-full flex-col gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] p-4 sm:flex-row sm:items-center"
        >
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-white/5">
            {post.heroImage ? (
              <Image
                src={post.heroImage}
                alt={post.titleEn}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-white/30">
                No image
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-semibold">{post.titleEn}</h3>
              <BlogStatusBadge status={post.status} />
              <span className="text-xs uppercase text-white/40">
                {post.category}
              </span>
            </div>
            <p className="truncate text-sm text-white/50" dir="rtl">
              {post.titleFa}
            </p>
            <p className="text-xs text-white/30">/{post.slug}</p>
          </div>

          <div className="flex gap-2 sm:shrink-0">
            <Button
              onClick={() => handleEdit(post)}
              className="bg-blue-500 hover:bg-blue-400"
            >
              <Pencil />
            </Button>
            <Button
              onClick={() => handleDeleteClick(post.id)}
              className="bg-red-500 hover:bg-red-400"
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
