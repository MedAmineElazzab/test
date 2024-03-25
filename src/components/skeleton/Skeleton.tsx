import {Skeleton as SkeletonMantine, SkeletonProps as SkeletonMantineProps,} from "@mantine/core"

interface SkeletonProps extends SkeletonMantineProps {

}
export  function Skeleton(props : SkeletonProps) {
  return (
    <SkeletonMantine {...props} />
  )
}
