import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, completed } = await request.json()
    
    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        title,
        description,
        completed
      }
    })
    
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}