import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import { StyledPaginationBtn, StyledPageInfoBtn } from '../Style_table'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

export default function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props
  const [rowcount, setRowCount] = React.useState(0)
  const [pagenum, setPageNum] = React.useState(0)
  React.useEffect(() => {
    if (count !== undefined) {
      setRowCount(count)
      setPageNum(page)
    } else {
      const zero = 0
      setRowCount(zero)
      setPageNum(zero)
    }
    // console.log('pagination-- rowcount', rowcount, 'pagenum=', props.page)
  }, [count, page, rowsPerPage])

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(rowcount / rowsPerPage) - 1))
  }

  return (
    <>
      <StyledPaginationBtn onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? 'Last' : 'First'}
      </StyledPaginationBtn>
      <StyledPaginationBtn onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </StyledPaginationBtn>
      <StyledPageInfoBtn>
        Page
        {pagenum + 1}
        of {Math.ceil(rowcount / rowsPerPage)}
      </StyledPageInfoBtn>
      <StyledPaginationBtn
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(rowcount / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </StyledPaginationBtn>
      <StyledPaginationBtn
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(rowcount / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? 'First' : 'Last'}
      </StyledPaginationBtn>
    </>
  )
}
