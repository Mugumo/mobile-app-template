import { FC, ReactNode, useContext, useEffect } from "react";
import Head from "next/head";
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import toast from "react-hot-toast";
import AppContext from "@/AppContext";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  canonicalURL?: string;
  children: ReactNode;
}

export const Page: FC<Props> = ({
  children,
  title = "",
  description = "",
  image = "",
  canonicalURL = "",
}) => {

  const { state, refreshPage } = useContext(AppContext)
  const router = useRouter()

  const handleRefresh = async () => {
    toast.loading("Reloading page...")
    refreshPage("done")
    setTimeout(() => {
      router.reload()
    }, 1200)
  }

  useEffect(() => {
    if (state?.refresh === "done") {
      setTimeout(() => {
        toast.success("Reloaded")
        refreshPage("")
      }, 1000)
    }
  }, [])

  return (
    <div className="h-screen">
      <Head>
        <title>{`Wallet App | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="image" content={image} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={image} />
        <meta name="og:url" content="" />
        <meta name="og:site_name" content="" />
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:alt" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      </Head>
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={200}
        onRefresh={handleRefresh}
        triggerHeight={50}
        backgroundColor='white'
        startInvisible={true}
      >
        <div className="min-h-screen w-screen flex flex-col relative overflow-y-auto">
          {children}
        </div>
      </PullToRefresh>
    </div>
  );
};
