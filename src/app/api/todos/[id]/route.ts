import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params untuk Next.js 15
    const { id } = await context.params
    const { title, description, completed } = await request.json()
    
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        completed
      }
    })
    
    return NextResponse.json(todo)
  } catch (error) {
    console.error('Failed to update todo:', error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params untuk Next.js 15
    const { id } = await context.params
    
    await prisma.todo.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Failed to delete todo:', error)
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}